const bcrypt = require('bcryptjs');

const plainPassword = "98765";
const hashedPassword = "$2b$10$/UgoI/HIydDa.VUeXfvK9evnIn1sKdOSOxHU4nO9hGE3uKf6GU8Bq";

bcrypt.compare(plainPassword, hashedPassword).then((match) => {
  console.log("Password matches:", match);
});
