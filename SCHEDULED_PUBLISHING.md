# IQ4EV scheduled publishing

## Before enabling publishing

1. Start from the working site with the SEO update. This package contains the three admin source replacements, the GitHub workflow and its worker. Copy each file to its matching path, including the workflow under `.github/workflows`. This workflow uses the existing `content_items` table and requires no SQL migration.
2. Run `npm run build`. Commit the publishing files to `main` and push them. The GitHub job stays disabled for automatic releases until you enable it below.
3. In GitHub, open the **IQ4EV website repository → Settings → Secrets and variables → Actions → Secrets**. Add `SUPABASE_URL` with the existing IQ4EV project URL. Add `SUPABASE_PUBLISHING_KEY` with a server-side Supabase secret key or the existing legacy service-role key. Use GitHub's secret fields. Keep the key out of the repository, the frontend and chat. Confirm the URL matches the project used by the live website.
4. Open **GitHub → Actions → Publish scheduled IQ4EV content → Run workflow**, select `main`, and leave **Check existing draft timestamps without publishing** selected. Run this before creating any schedules. The expected result is **0 dated drafts**. If the count is higher, review those drafts before enabling releases. This check runs read-only even when automatic publishing is disabled.
5. Confirm signed-out and inactive accounts cannot read drafts through the existing Supabase Data API before scheduling private content. Validate that an admin can save and reopen a test schedule. The code stores a schedule on a draft as midnight SAST in the existing `published_at` field. Only use that timestamp pattern on a draft when you intend to schedule it.
6. Under **Settings → Secrets and variables → Actions → Variables**, add the repository variable `IQ4EV_PUBLISHING_ENABLED` with value `true`. This enables automatic releases. Set it to `false` to pause. A run already in progress can finish. Review overdue items before re-enabling because the job catches up on later runs.

## Use the editor

- Open **Admin → Manage insights** or **Manage briefings**, then open or create a draft.
- Choose **Scheduled**, pick a future South African calendar date, then save. Use the **Scheduled** filter to review the queue. The hourly job normally first checks around **00:17 SAST** on the scheduled date. GitHub can delay or skip a run. Later runs catch up and record the actual release time.
- Change the date to reschedule. Select **Draft** and save to cancel. Archiving also clears the schedule. For a same-day manual release, use **Published**. To schedule an already published item again, save it as a draft first.
- The job changes a due draft to **Published** and records the actual release time. It checks the draft status and exact scheduled date before each update, so a cancellation, reschedule or prior release wins the race. GitHub Actions shows which content IDs were released and when.
- Automatic releases do not send subscriber emails. The existing manual-publish workflow keeps its email queue behaviour.

## Confirm end to end

Once enabled, schedule an Insight intended for release on a future date. Close the admin tab. On that date, confirm a GitHub run logged the release and the item appears on the public Insights page. Verify scheduled Briefings using an entitled account and the existing access policy. Review failed GitHub runs for the HTTP status. A failed item remains due for the next run.

The build and worker tests were run locally with a mocked Data API. The live database permissions, GitHub repository secrets and hosted schedule still need the checks above.
