# Release checks — Orbit 0.1.0

Checked on 24 September 2026. This is an MVP source release and interactive demo; no hosted deployment was made.

## Automated verification

- TypeScript check passed.
- Worker-compatible production build passed.
- Offline demo build passed; its JavaScript and styles are embedded in a single HTML file.
- All 26 backend integration assertions passed in an isolated temporary D1 database.
- Calendar-range checks passed for 30-day comparisons, explicit date ranges and a leap-day boundary.
- Local database initialization succeeded; repeating it reported no pending migrations.

The backend assertions cover anonymous access denial, empty new accounts, record creation and editing, linked tasks, organization and client isolation, invalid URLs/numbers, cross-origin mutation rejection, conditional follow-up automation, import persistence and atomic rejection, HTML source auditing, saved report content, exact 30-day report date labels, printable report rendering, membership claims, role restrictions, reference cleanup, subsequent-request persistence and the disconnected AI state.

## Browser verification

- Desktop dashboard rendered with the requested white theme.
- Creating a task from an insight opened a prefilled editor, retained its keyword link and added it to the task list.
- Switching to a different client cleared the prior client's tasks and showed the correct empty state.
- Creating a report generated a viewable snapshot with the selected client's name and recorded metrics.
- The offline demo rendered without loading external JavaScript or CSS assets.
- Dashboard layouts in 320, 390 and 768 px frames had no document-wide horizontal overflow; browser scrollbars reduced the measured content widths to 305, 375 and 753 px.
- The 390 px phone navigation drawer opened, switched to Projects and opened the task board.
- No application errors appeared in the browser console during the checked flows. An unrelated browser-extension metadata error was present.

## Corrections made in this pass

- Fixed an off-by-one error in the displayed start date of rolling report periods.
- Reset the consultant view when switching clients so the previous client's chat does not remain visible.
- Kept the standalone demo's navigation in memory so file-based previews do not depend on URL-history support.
- Restricted Tailwind's source scanning to application directories, keeping generated demo files out of later CSS builds.
- Added repeatable local migration and offline-demo build commands, setup instructions and an explicit integration roadmap.

## Verification limits

The review covers representative workflows, not every screen on every device. Actual phones, real account/OAuth flows, paid OpenAI requests, live data sync, content publishing, email delivery, production concurrency, large datasets and automatic server-side PDF generation were not verified. Browser Print / Save PDF is provided; no unattended PDF service is included.

Backend persistence and authorization were verified with simulated gateway identity in local tests. They still require the supported Sites gateway and a deployed database in production. See README.md before choosing another host.
