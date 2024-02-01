const { User, Routine }  = require('../models/index')
const { db } = require('../models/index')
// const bcrypt = require('bcrypt')
// const BCRYPT_SALT_ROUNDS = 12

const seedDb = async () => {
  try {
    console.log('Start seeding...');
    // clear out data in tables specified below
    await User.destroy({
      where: {}
    })
    console.log('Users cleared.');
  
    // add records to tables specified below
    const tom = await User.create({
      name: "Tom Brady",
      email: "tombrady@fakemail.com",
      password: 'password',
      isfamous: false
    })

    const lebron = await User.create({
      name: "Lebron James",
      email: "lebron@fakemail.com",
      password: 'password',
      isfamous: true
    });

    const tiger = await User.create({
      name: "Tiger Woods",
      email: "tiger@fakemail.com",
      password: 'password',
      isfamous: true
    });

    const routine1 = await Routine.create({
      startTime: "5:30am",
      endTime: "6:30am",
      description: "Wakes up and works out for 1hr in the morning"
    })
    const routine2 = await Routine.create({
      startTime: "1:00pm",
      endTime: "2:00pm",
      description: "Works out again with teammates and has light lunch"
    })
   
    const routine3 = await Routine.create({
      startTime: "6:00pm",
      endTime: "9:00pm",
      description: "Spends time with kids after practice and goes out for dinner, finally going to bed"
    })
    const routine4 = await Routine.create({
      startTime: "6:00am",
      endTime: "7:00pm",
      description: "Wakes up and prepares breakfast before taking kids to school"
    })
    const routine5 = await Routine.create({
      startTime: "12:00pm",
      endTime: "2:00pm",
      description: "Goes to practice for an hour and then has lunch with teammates"
    })
    const routine6 = await Routine.create({
      startTime: "7:00pm",
      endTime: "9:00pm",
      description: "Meets up with friends or meet wife for dinner and sleeps early"
    })
    const routine7 = await Routine.create({
      startTime: "5:00am",
      endTime: "7:00am",
      description: "Wakes up early and fasts before playing 18 holes"
    })
    const routine8 = await Routine.create({
      startTime: "1:00pm",
      endTime: "3:00pm",
      description: "Eats lunch and goes to pick up kids from school"
    })
    const routine9 = await Routine.create({
      startTime: "8:00pm",
      endTime: "11:00pm",
      description: "He stretches in the evening to keep back limber and then has dinner with kids before bed"
    })


    // routine start here

    await routine1.setUser(tom)
    await routine2.setUser(tom)
    await routine3.setUser(tom)
    await routine4.setUser(lebron)
    await routine5.setUser(lebron)
    await routine6.setUser(lebron)
    await routine7.setUser(tiger)
    await routine8.setUser(tiger)
    await routine9.setUser(tiger)


    console.log('Database seeded successfully!');
  } catch(e) {
    console.error('Error seeding database:', e);
  }
}

const run = async () => {
  try {
    await db.sync();
    await seedDb();
  } catch(e) {
    console.log(e)
  } finally {
    await process.exit()
  }
}

run()
