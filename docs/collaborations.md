# MindState collaboration space

Local entry point: `/collaborate/`. It is linked from the account menu, dashboard and contribution guide. The team workspace links to its review section.

## Flow

- Create a need-art or need-writing request with an EN/DE brief, optional draft/reference image, content warning and anonymous-credit choice.
- A second member takes the other role, or proposes a change in the notes thread. There is exactly one writer and one artist per pair.
- Both edit the shared submission. Normal image sanitisation, format and 5 MB limits apply, with five publication-image slots and one featured slot. Private image previews use permission-checked routes.
- Each member confirms the current revision and consent/licence declaration. Edits, partner changes and requests for changes invalidate confirmation. Either member can submit only after both agree.
- Editorial, verified admins and onboarded verified moderators use the separate joint-review path: Submitted → In review → Approved → Published, or Changes requested. Co-authors cannot review their own work. There is no automatic translation, generative art or audio transformation.
- Publication uses the existing reader, approved snapshot and library. It creates two credits; anonymous credits have no identity/profile links and do not appear on an account's public portfolio.
- Leaving is available before the first submission. The remaining member can find another partner; consent is reset. Departing members' material must be reworked or removed unless permission has been obtained. After submission, withdrawal is handled by editorial under the existing account and 14-day takedown rules; no unilateral publish/delete shortcut is added here.

## Privacy

Open briefs and supplied references are visible to signed-in members. Once paired, shared drafts, images and notes are restricted to the pair and eligible reviewers after submission. Review screens use safe credit labels and role-labelled notes. The original single-author tracker, editor and review endpoints redirect joint work into this permission-checked workspace. The single-author review queue excludes joint submissions.

Anonymity hides account identity in this flow; it cannot remove identifying details voluntarily written or drawn into a brief, reference, piece, credit or note. The forms explain this to members.

Authorship, the human-drawn rule, permissive licences and unchanged narration require both authors' declarations and editorial review. Fields alone do not establish copyright or prove authorship.

## Local demo and checks

```
.venv\Scripts\python.exe manage.py migrate
.venv\Scripts\python.exe manage.py seed_collaborations --owner LOCAL_TEST_USERNAME
.venv\Scripts\python.exe manage.py test accounts.test_collaboration --noinput
```

The seed command is idempotent and development-only. It adds English and German requests, an anonymous example and optionally a request owned by an existing local test account. Synthetic demo authors have unusable passwords. Demo pieces cannot publish into the real library; automated tests exercise the complete two-account review/publication flow with isolated test accounts.

`/collaborate/?empty=1` previews the empty board only while DEBUG is enabled. It does not change saved data. Normal empty states render without this parameter when no requests or personal collaborations exist.

Verification: the 104-test accounts/alpha regression suite passed, followed by all 16 collaboration tests after final upload-preview and moderator-anonymity changes. Running-browser checks covered anonymous joining, shared-draft saving, notes, desktop/mobile layouts and empty states.
