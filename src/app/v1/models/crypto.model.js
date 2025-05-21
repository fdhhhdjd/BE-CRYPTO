const MongoDatabase = require("../../share/database/mongo.database");

function getVietnamDayRange() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const day = now.getDate();

  // 00:00:00 VN (UTC+7)
  const startVN = new Date(Date.UTC(year, month, day, -7, 0, 0));
  // 23:59:59 VN (UTC+7)
  const endVN = new Date(Date.UTC(year, month, day + 1, -7, 0, 0));

  // Format: "YYYY-MM-DD HH:mm:ss"
  function format(dt) {
    const y = dt.getUTCFullYear();
    const m = (dt.getUTCMonth() + 1).toString().padStart(2, "0");
    const d = dt.getUTCDate().toString().padStart(2, "0");
    const h = dt.getUTCHours().toString().padStart(2, "0");
    const mi = dt.getUTCMinutes().toString().padStart(2, "0");
    const s = dt.getUTCSeconds().toString().padStart(2, "0");
    return `${y}-${m}-${d} ${h}:${mi}:${s}`;
  }

  return {
    start: format(startVN),
    end: format(endVN),
  };
}

class CryptoModel {
  async getAllMarkets() {
    try {
      const { start, end } = getVietnamDayRange();

      const filter = {
        timestamp: {
          $gte: start,
          $lt: end,
        },
      };

      const cursor = await MongoDatabase.query(
        "market_snapshot",
        "find",
        filter,
        { sort: { timestamp: 1 } }
      );
      return await cursor.toArray();
    } catch (err) {
      console.error("Error in getAllMarkets:", err);
      throw err;
    }
  }
}

module.exports = new CryptoModel();
