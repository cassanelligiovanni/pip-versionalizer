import React, { useState } from 'react';

function PypiVersionFetcher() {
  const [packages, setPackages] = useState('');
  const [versions, setVersions] = useState([]);

  const handleFetchVersions = async () => {
    const packageList = packages.split('\n').map(pkg => pkg.trim());
    const versionList = [];

    for (let pkg of packageList) {
      if (pkg) {
        try {
          const response = await fetch(`https://pypi.org/project/${pkg}`);
          const text = await response.text();
          const regex = /<h1 class="package-header__name">\s*(.*?)\s*<\/h1>/;
          const match = text.match(regex);
          if (match) {
            versionList.push(`${pkg}==${match[1].split(' ')[1]}`);
          }
        } catch (error) {
          versionList.push(`${pkg}==Not Found`);
        }
      }
    }

    setVersions(versionList);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>PyPI Package Version Fetcher</h1>
      <textarea
        rows="5"
        cols="40"
        value={packages}
        onChange={(e) => setPackages(e.target.value)}
        placeholder="Enter package names, one per line"
      />
      <br />
      <button onClick={handleFetchVersions}>Fetch Versions</button>
      <h2>Requirements.txt:</h2>
      <textarea
        rows="10"
        cols="40"
        value={versions.join('\n')}
        readOnly
      />
    </div>
  );
}

export default PypiVersionFetcher;
