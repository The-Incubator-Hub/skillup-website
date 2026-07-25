<?php

namespace App\Filament\Instructor\Widgets;

use App\Enums\CohortStatus;
use App\Enums\EnrollmentStatus;
use App\Filament\Instructor\Concerns\ScopesInstructorProfile;
use App\Models\Catalog\Cohort;
use App\Models\Catalog\CohortSession;
use App\Models\Catalog\Enrollment;
use Filament\Widgets\StatsOverviewWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class InstructorOverview extends StatsOverviewWidget
{
    use ScopesInstructorProfile;

    protected static ?int $sort = 1;

    protected function getStats(): array
    {
        $cohortIds = Cohort::where('instructor_profile_id', static::instructorProfileId())->pluck('id');

        $runningCohorts = Cohort::whereIn('id', $cohortIds)
            ->whereIn('status', [CohortStatus::Open->value, CohortStatus::InProgress->value])
            ->count();

        $activeLearners = Enrollment::whereIn('cohort_id', $cohortIds)
            ->where('status', EnrollmentStatus::Active->value)
            ->count();

        $sessionsThisWeek = CohortSession::whereIn('cohort_id', $cohortIds)
            ->whereBetween('starts_at', [now()->startOfWeek(), now()->endOfWeek()])
            ->count();

        $nextSession = CohortSession::whereIn('cohort_id', $cohortIds)
            ->where('starts_at', '>=', now())
            ->orderBy('starts_at')
            ->with('cohort')
            ->first();

        return [
            Stat::make('Cohorts in flight', number_format($runningCohorts))
                ->description(number_format($cohortIds->count()).' assigned in total')
                ->descriptionIcon('heroicon-m-user-group')
                ->color('primary'),

            Stat::make('Active learners', number_format($activeLearners))
                ->description('Across your cohorts')
                ->descriptionIcon('heroicon-m-academic-cap')
                ->color($activeLearners > 0 ? 'success' : 'gray'),

            Stat::make('Sessions this week', number_format($sessionsThisWeek))
                ->description($sessionsThisWeek > 0 ? 'Check your schedule below' : 'No sessions scheduled')
                ->descriptionIcon('heroicon-m-calendar-days')
                ->color($sessionsThisWeek > 0 ? 'warning' : 'gray'),

            Stat::make('Next session', $nextSession ? $nextSession->starts_at->format('D, M j · g:i A') : 'None scheduled')
                ->description($nextSession?->cohort?->title ?? 'Publish a schedule to see it here')
                ->descriptionIcon('heroicon-m-clock')
                ->color($nextSession ? 'primary' : 'gray'),
        ];
    }
}
