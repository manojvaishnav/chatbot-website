const fs = require('fs');

module.exports.deleteTempFile = async (filePath) => {
    await fs.unlink(filePath, (err) => {
        if (err) {
            console.error('Error deleting file:', err);
            return;
        }

        if(!err){
            console.log('File deleted successfully');
            return;
        }
    });
}

// module.exports.deleteTempFile = (filePath, callback) => {
//     fs.unlink(filePath, (err) => {
//         if (err) {
//             console.error('Error deleting file:', err);
//             callback(err);
//             return;
//         }

//         console.log('File deleted successfully');
//         callback(null);
//     });
// }