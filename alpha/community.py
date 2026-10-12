COMMUNITY_MEMBERS = [
    {"name": "Ashish Maurya", "role": "Developer"},
    {"name": "Ishita", "role": "Writer"},
    {"name": "Johanna Huber", "role": "Writer"},
    {"name": "Ruby", "role": "Writer"},
    {"name": "Rudransh Shukla", "role": "Developer"},
    {"name": "Sanja", "role": "Writer"},
    {"name": "Selina", "role": "Writer"},
    {"name": "Sophia", "role": "Writer"},
]


def directory_members():
    from accounts.models import Contributor
    from accounts.visibility import hidden_member_ids
    people = list(Contributor.objects.exclude(profile__user_id__in=hidden_member_ids()).filter(post_credits__post__is_published=True, post_credits__anonymous=False).select_related('profile__user').distinct())
    members = []
    seen_profiles, seen_names = set(), set()
    hidden_people=Contributor.objects.filter(profile__user_id__in=hidden_member_ids()).select_related('profile')
    hidden_names={name.casefold() for person in hidden_people for name in (person.name,person.profile.display_name) if name}
    for person in people:
        if person.profile_id:
            if person.profile_id in seen_profiles:
                continue
            seen_profiles.add(person.profile_id)
        name = person.profile.display_name if person.profile_id else person.name
        name = name or 'MindState member'
        members.append({'name': name, 'role': person.role, 'people': [person]})
        seen_names.add(name.casefold())
    for member in COMMUNITY_MEMBERS:
        if member['name'].casefold() not in seen_names | hidden_names:
            members.append(member)
    return sorted(members, key=lambda member: member['name'].casefold())
