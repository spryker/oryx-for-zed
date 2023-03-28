function configurePaths(entryPaths, runtimeEntryName) {
    if (!runtimeEntryName) {
        return entryPaths;
    }

    const runtimeEntryPaths = {};
    const dependedEntryPaths = {};

    Object.entries(entryPaths).forEach(([key, value]) => {
        if (key === runtimeEntryName) {
            runtimeEntryPaths[key] = {
                runtime: false,
                import: value,
            };
        }

        if (key !== runtimeEntryName) {
            dependedEntryPaths[key] = {
                dependOn: runtimeEntryName,
                import: value,
            };
        }
    });

    return {
        ...runtimeEntryPaths,
        ...dependedEntryPaths,
    }
}

module.exports = configurePaths;
