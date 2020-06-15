#! /usr/bin/env node

const fs = require('fs');
const Faker = require('faker');

const fakePeople = n => new Array(n).fill(undefined).map(() => ({
  name: Faker.name.findName(),
  phoneNo: Faker.phone.phoneNumber(),
  address: `${Faker.random.number()} ${Faker.address.streetName()}`,
  city: Faker.address.city(),
  postCode: Faker.address.zipCode(),
  note: Faker.lorem.paragraph(),
  email: Faker.internet.email(),
  userName: Faker.internet.userName(),
}));

const generate = () => {
    const FILE_NAME = 'data-file.csv';
    const t = 100000;

    try {
        fs.unlinkSync(FILE_NAME);
    } catch (err) {
        console.log('File does not exists');
    }

    fakePeople(t).map((person, index) => {
        if(index === 0) {
            const keys = Object.keys(person).join(',');
            fs.appendFileSync(FILE_NAME, `${keys}\n`);
        }
        const personalData = Object
            .values(person)
            .map(d => `'${d}'`)
            .join(',');
        fs.appendFileSync(FILE_NAME, `${personalData}\n`);
    });
};

generate();