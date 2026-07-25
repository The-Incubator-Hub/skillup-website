<?php

namespace App\Filament\Instructor\Widgets;

use App\Filament\Instructor\Concerns\ScopesInstructorProfile;
use App\Models\Catalog\Cohort;
use App\Models\Catalog\CohortSession;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Widgets\TableWidget;
use Illuminate\Support\Str;

class InstructorUpcomingSessions extends TableWidget
{
    use ScopesInstructorProfile;

    protected static ?int $sort = 2;

    protected int|string|array $columnSpan = 'full';

    protected static ?string $heading = 'Your upcoming sessions';

    public function table(Table $table): Table
    {
        $cohortIds = Cohort::where('instructor_profile_id', static::instructorProfileId())->pluck('id');

        return $table
            ->query(
                CohortSession::query()
                    ->whereIn('cohort_id', $cohortIds)
                    ->where('starts_at', '>=', now())
                    ->orderBy('starts_at')
                    ->limit(8),
            )
            ->paginated(false)
            ->columns([
                Tables\Columns\TextColumn::make('title')->weight('semibold'),
                Tables\Columns\TextColumn::make('cohort.title')->label('Cohort'),
                Tables\Columns\TextColumn::make('starts_at')->label('Starts')->dateTime('D, M j · g:i A'),
                Tables\Columns\TextColumn::make('ends_at')->label('Ends')->dateTime('g:i A'),
                Tables\Columns\TextColumn::make('delivery_mode')
                    ->badge()
                    ->formatStateUsing(fn ($state) => Str::headline((string) $state)),
                Tables\Columns\TextColumn::make('meeting_url')
                    ->label('Meeting')
                    ->formatStateUsing(fn ($state) => $state ? 'Open link' : '—')
                    ->url(fn (CohortSession $record) => $record->meeting_url ?: null, shouldOpenInNewTab: true)
                    ->color('primary'),
            ])
            ->emptyStateHeading('No upcoming sessions')
            ->emptyStateDescription('Sessions for your assigned cohorts will appear here.');
    }
}
