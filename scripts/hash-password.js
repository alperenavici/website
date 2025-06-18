const bcrypt = require('bcrypt');

const hashPassword = async (password) => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
};

// Kullanım örneği
const password = process.argv[2] || 'admin123';
hashPassword(password).then(hash => {
    console.log(`Original: ${password}`);
    console.log(`Hashed: ${hash}`);
    console.log(`\nSQL Komutu:`);
    console.log(`INSERT INTO users (email, username, password, role, created_at, updated_at)`);
    console.log(`VALUES ('admin@example.com', 'Admin', '${hash}', 'ADMIN', NOW(), NOW());`);
}); 