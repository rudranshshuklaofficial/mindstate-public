from .community import directory_members


def community_members(_request):
    return {"community_members": directory_members()}
