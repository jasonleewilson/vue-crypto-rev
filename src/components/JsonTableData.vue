<template>
  <div class="JsonTableData cell small-12">
    <div class="cell small-12">
      <input type="search" v-model="filter" placeholder="Filter" />
    </div>
    <table>
      <thead>
        <tr>
          <th @click="sort('rank')">Rank</th>
          <th @click="sort('name')">Name</th>
          <th @click="sort('price_usd')">USD</th>
          <th @click="sort('price_btc')">BTC</th>
          <th @click="sort('percent_change_24h')">24hrs</th>
          <th @click="sort('percent_change_7d')">7days</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="crypto in sortedCrypto" :key="crypto.sortedCrypto">
          <td>{{ crypto.rank }}</td>
          <td>{{ crypto.name }}</td>
          <td>{{ crypto.price_usd }}</td>
          <td>{{ crypto.price_btc }}</td>
          <td>{{ crypto.percent_change_24h }}%</td>
          <td>{{ crypto.percent_change_7d }}%</td>
        </tr>
      </tbody>
    </table>
    <p>
      <button @click="prevPage">Previous</button>
      <button @click="nextPage">Next</button>
    </p>
    <!-- debug: sort={{currentSort}}, dir={{currentSortDir}}, page={{currentPage}} -->
  </div>
</template>

<script>
export default {
  // name: "HelloWorld1",
  // props: {
  //   msg: String
  // }
  data: function() {
    return {
      crypto: [],
      currentSort: "rank",
      currentSortDir: "asc",
      pageSize: 10,
      currentPage: 1,
      filter: ""
    };
  },
  created: function() {
    fetch("https://api.coinmarketcap.com/v1/ticker/")
      .then(res => res.json())
      .then(res => {
        this.crypto = res;

        //turn json string > integer
        for (let index = 0; index < this.crypto.length; index++) {
          this.crypto[index].rank = parseInt(this.crypto[index].rank);
        }
        for (let index = 0; index < this.crypto.length; index++) {
          this.crypto[index].price_usd = parseFloat(
            this.crypto[index].price_usd
          );
        }
        for (let index = 0; index < this.crypto.length; index++) {
          this.crypto[index].price_btc = parseFloat(
            this.crypto[index].price_btc
          );
        }
        for (let index = 0; index < this.crypto.length; index++) {
          this.crypto[index].percent_change_24h = parseFloat(
            this.crypto[index].percent_change_24h
          );
        }
        for (let index = 0; index < this.crypto.length; index++) {
          this.crypto[index].percent_change_7d = parseFloat(
            this.crypto[index].percent_change_7d
          );
        }
      });
  },
  methods: {
    sort: function(s) {
      //if s == current sort, reverse
      if (s === this.currentSort) {
        this.currentSortDir = this.currentSortDir === "asc" ? "desc" : "asc";
      }
      this.currentSort = s;
    },
    nextPage: function() {
      if (this.currentPage * this.pageSize < this.crypto.length)
        this.currentPage++;
    },
    prevPage: function() {
      if (this.currentPage > 1) this.currentPage--;
    }
  },
  computed: {
    sortedCrypto: function() {
      let _crypto = this.crypto;
      // first filter
      if (this.filter !== "") {
        _crypto = _crypto.filter(
          c => c.name.toLowerCase().indexOf(this.filter.toLowerCase()) >= 0
        );
      }
      return _crypto
        .sort((a, b) => {
          let modifier = 1;
          if (this.currentSortDir === "desc") modifier = -1;
          if (a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
          if (a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
          return 0;
        })
        .filter((row, index) => {
          let start = (this.currentPage - 1) * this.pageSize;
          let end = this.currentPage * this.pageSize;
          if (index >= start && index < end) return true;
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
a {
  color: #42b983;
}
</style>
