const fs = require('fs');

module.exports.deleteTempFile = async (filePath) => {
    await fs.unlink(filePath, (err) => {
        if (err) {
            console.error('Error deleting file:', err);
            return;
        }
        console.log('File deleted successfully');
    });
}