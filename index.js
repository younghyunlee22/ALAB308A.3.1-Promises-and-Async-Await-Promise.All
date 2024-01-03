import { central, db1, db2, db3, vault } from "./databases.js";

async function getUserData(id) {
  const dbs = {
    db1: db1,
    db2: db2,
    db3: db3,
  };

  try {
    const valueReturnedFromCentral = await central(id);
    const dataFromDB = dbs[valueReturnedFromCentral](id);
    const dataFromVault = vault(id);
    const [valueReturnedFromDB, valueReturnedFromVault] = await Promise.all([
      dataFromDB,
      dataFromVault,
    ]);

    const user = {
      id: id,
      name: valueReturnedFromVault.name,
      username: valueReturnedFromDB.username,
      email: valueReturnedFromVault.email,
      address: valueReturnedFromVault.address,
      phone: valueReturnedFromVault.phone,
      website: valueReturnedFromDB.website,
      company: valueReturnedFromDB.company,
    };

    return user;
  } catch (err) {
    console.log(err);
  }
}

getUserData(1);

// Logging the result
// Method 1.

getUserData(1)
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error("Error:", error);
  });

// Method 2.

(async () => {
  try {
    const result = await getUserData(1);
    console.log(result);
  } catch (error) {
    console.error("Error:", error);
  }
})();
