import React, { useState } from 'react';

function PypiVersionFetcher() {
  const [packages, setPackages] = useState('');
  const [versions, setVersions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleFetchVersions = async () => {
    setIsLoading(true);
    const packageList = packages.split('\n').map(pkg => pkg.trim());
    const versionList = [];

    for (let pkg of packageList) {
      if (pkg) {
        try {
          const response = await fetch(`https://pip-versionalizer-backend.adaptable.app/api/package/${pkg}`);
          if (response.ok) {
            const data = await response.json();
            versionList.push(`${data.package}==${data.version}`);
          } else {
            versionList.push(`${pkg}==Not Found`);
          }
        } catch (error) {
          versionList.push(`${pkg}==Error`);
        }
      }
    }

    setVersions(versionList);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col gap-4 w-[50%] justify-center items-center py-20">
      <h1 className="text-4xl font-bold mb-6">Pip-Versionalizer</h1>
      <textarea
        rows="5"
        cols="40"
        value={packages}
        onChange={(e) => setPackages(e.target.value)}
        placeholder="Enter package names, one per line"
        className="textarea textarea-primary" 
      />
      <br />
      <button 
        className="btn btn-primary" 
        onClick={handleFetchVersions} 
        disabled={isLoading}
      >
        {isLoading ? 'Fetching...' : 'Fetch Versions'}
      </button>
      <h2>Output:</h2>
      <textarea
        rows="5"
        cols="40"
        value={versions.join('\n')}
        readOnly
        className="textarea textarea-accent" 
      />
    </div>
  );
}

export default PypiVersionFetcher;
