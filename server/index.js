const PORT = process.env.PORT || 1337;
const app = require("./app");

const init = async () => {
  try {
    app.listen(PORT, () => console.log(`ALL SERVERS REPORTING FOR DUTY ON ${PORT}`));
  } catch (ex) {
    console.log(ex);
  }
};

init();
