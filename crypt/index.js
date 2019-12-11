const fs = require('fs')
const crypto = require('crypto')
const alg = 'aes-256-ctr'
const key = 'nathalya'
const cipher = crypto.createCipher(alg, key)

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

readline.question(`Digite (c) para criptografar um arquivo e (d) para descriptografar: `, (answer) => {
    
    if (answer === 'c') {
        readline.question('Digite o nome do arquivo que deseja criptografar: ', (fileName) => { 
            
            if (fs.existsSync(fileName)) {
                const read = fs.createReadStream(fileName);
                const write = fs.createWriteStream('encrypted-' + fileName);
                
                read.pipe(cipher).pipe(write);
                fs.unlinkSync(fileName);
                console.log('Arquivo criptografado com sucesso!');
                
            } else {
                console.log('Arquivo não encontrado.');
            }

            readline.close();
        });

    } else if (answer === 'd') {
        readline.question('Digite o nome do arquivo que deseja descriptografar: ', (fileName) => { 

            if (fs.existsSync(fileName)) {
                readline.question(`Digite sua chave de acesso: `, (password) => {
                    
                    if (password === key) {
                        const read = fs.createReadStream(fileName);
                        const write = fs.createWriteStream('decrypted-' + fileName);

                        read.pipe(cipher).pipe(write);
                        console.log('Arquivo descriptografado com sucesso!');
                    } else {
                        console.log('Chave inválida. Arquivo não descriptografado.');
                    }

                    readline.close();
                });

            } else {
                console.log('Arquivo não encontrado.');
                readline.close();
            }
        });
        
    } else {
        console.log('Opção inválida.');
    }
});