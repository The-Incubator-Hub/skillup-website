<?php

namespace App\Filament\Corporate\Widgets;

use App\Filament\Corporate\Concerns\ScopesCorporateAccount;
use App\Models\Catalog\Enrollment;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Widgets\TableWidget;
use Illuminate\Support\Str;

class CorporateRecentEnrollments extends TableWidget
{
    use ScopesCorporateAccount;

    protected static ?int $sort = 2;

    protected int|string|array $columnSpan = 'full';

    protected static ?string $heading = 'Recent team enrollments';

    public function table(Table $table): Table
    {
        return $table
            ->query(
                Enrollment::query()
                    ->whereIn('corporate_account_id', static::corporateAccountIds())
                    ->with(['user', 'product', 'cohort'])
                    ->latest()
                    ->limit(8),
            )
            ->paginated(false)
            ->columns([
                Tables\Columns\TextColumn::make('user.name')->label('Learner')->default('—')->weight('semibold'),
                Tables\Columns\TextColumn::make('product.title')->label('Course')->default('—'),
                Tables\Columns\TextColumn::make('cohort.title')->label('Cohort')->default('—'),
                Tables\Columns\TextColumn::make('status')
                    ->badge()
                    ->formatStateUsing(fn ($state) => Str::headline($state->value ?? $state)),
                Tables\Columns\TextColumn::make('created_at')->label('Enrolled')->since(),
            ])
            ->emptyStateHeading('No enrollments yet')
            ->emptyStateDescription('Your team\'s course enrollments will appear here.');
    }
}
