const admin = require("../config/firebaseAdmin");

async function create() {
  try {
    const user = {
      name: "João Vitor Vitosoaski",
      password: "joao20e10",
      email: "joao.cz@hotmail.com",
      role: "admin",
    };

    const { uid } = await admin.auth().createUser({
      displayName: user.name,
      email: user.email,
      password: user.password,
    });

    // Define as claims personalizadas, como o role (papel)
    await admin.auth().setCustomUserClaims(uid, { role: user.role });

    console.log(uid);
  } catch (err) {
    console.log({ message: "Error creating user", error: err });
  }
}

create();
