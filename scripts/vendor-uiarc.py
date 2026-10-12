"""Fetch explicitly selected MIT UIArc sources; never fetch paid items.

Run manually when updating vendored sources. No app credentials are used.
"""
import json
from pathlib import Path
import urllib.request

ROOT = Path(__file__).resolve().parents[1]
DEST = ROOT / 'frontend/src/components/arc'
SELECTED = ['dialog', 'select', 'tabs', 'accordion', 'otp-input',
            'file-dropzone', 'copy-button', 'tooltip',
            'button', 'empty-state', 'code-block']

def fetch(path):
    request = urllib.request.Request('https://uiarc.dev/' + path,
                                    headers={'User-Agent': 'Mozilla/5.0'})
    return urllib.request.urlopen(request, timeout=30).read().decode('utf-8')

def main():
    catalog = json.loads(fetch('r/catalog.json'))
    metadata = {item['name']: item for item in catalog['items']}
    seen = set()
    def install(name):
        if name in seen:
            return
        seen.add(name)
        if name not in ('arc-motion-tokens', 'arc-foundation'):
            assert metadata[name]['tier'] == 'free', name
        payload = json.loads(fetch('r/' + name + '.json'))
        for dependency in payload.get('registryDependencies', []):
            install(dependency.rsplit('/', 1)[-1].removesuffix('.json'))
        for item in payload.get('files', []):
            relative = item['path'].removeprefix('registry/components/').removeprefix('registry/')
            target = DEST / relative
            assert target.resolve().is_relative_to(DEST.resolve())
            target.parent.mkdir(parents=True, exist_ok=True)
            target.write_text(item['content'], encoding='utf-8')
        print('Installed free source:', name)
    for name in SELECTED:
        install(name)
    (DEST / 'catalog-selection.json').write_text(json.dumps(
        [{key: metadata[name].get(key) for key in
          ('name', 'tier', 'docs', 'dependencies', 'accessibility', 'motion')}
         for name in SELECTED], indent=2), encoding='utf-8')
    # Preserve the checked-in MIT notice; the site has no /license/markdown endpoint.
    print('Reapply the documented MindState adaptations before rebuilding.')

if __name__ == '__main__':
    main()
