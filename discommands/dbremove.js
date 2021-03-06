module.exports = {
  name: 'dbremove',
  description: 'Delete something from the userinputs database',
  execute(msg, args) {
    const SQLite = require("better-sqlite3");
    const db = new SQLite('../userinputs.sqlite');
    // Check if the table "userinputs" exists.
    const table = db.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'userinputs';").get();
    if (!table['count(*)']) {
      // If the table isn't there, create it and setup the database correctly.
      db.prepare("CREATE TABLE userinputs (row INTEGER NOT NULL PRIMARY KEY, user TEXT, channel TEXT, type TEXT, content TEXT, lastUsed DATETIME, dateAdded DATETIME);").run();
      // Ensure that the "row" row is always unique and indexed.
      db.prepare("CREATE UNIQUE INDEX idx_userinputs_row ON userinputs (row);").run();
      db.pragma("synchronous = 1");
      db.pragma("journal_mode = wal");
    }
    if (isNaN(args[0])) {
      msg.channel.send("You didn't enter an ID number");
    } else {
      const item = db.prepare("SELECT * FROM userinputs WHERE row = ?;").get(args[0]);
      if (item.guild == msg.guild.id && msg.member.roles.cache.has('ADMINISTRATOR')) {
        db.prepare("DELETE FROM userinputs WHERE row = ?").run(args[0]);
        msg.channel.send('Item deleted!');
      } else if (!msg.author.id == msg.guild.ownerID) {
        msg.channel.send('Only admins can use this function.');
      } else {
        msg.channel.send("You can only delete items from this server.");
      }
    }
  },
};
