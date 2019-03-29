const fs = require('fs');
const archiver = require('archiver');

const output = fs.createWriteStream(__dirname + "/../CORE19-02_events.zip");
const archive = archiver('zip', {
    zlib: { level: 9 } // Sets the compression level.
});
archive.pipe(output);
archive.glob('*', {"ignore": ['node_modules', 'tests', 'README.md']});
archive.finalize();