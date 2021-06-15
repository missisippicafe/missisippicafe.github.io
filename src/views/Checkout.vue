<template>
  <div class="bills">
    <div v-for="bill in billsReversed" :key="`bill-${bill.id}`" class="bill">
      <div class="logo">
        <img src="@/assets/redkit.jpeg" alt="redkitlogo" />
      </div>
      <div class="bill-title">Missisippi Cafe</div>
      <div class="row info">
        <div>Masa {{ bill.deskNum }}</div>
        <div class="date-string">
          <div>
            {{ new Date(bill.time.seconds * 1000).toLocaleDateString() }}
          </div>
          <div>
            {{ new Date(bill.time.seconds * 1000).toLocaleTimeString() }}
          </div>
        </div>
      </div>
      <div
        v-for="(order, key) in bill.orders"
        :key="`bill-orders-${key}`"
        class="row product"
      >
        <div>{{ order.amount }}x {{ order.product }}</div>
        <div>{{ order.subtotal }}₺</div>
      </div>
      <div class="divider"></div>
      <div class="row">
        <div>TOPLAM</div>
        <div>{{ bill.total }}₺</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Checkout",
  data: () => ({
    billCount: 0,
  }),
  computed: {
    bills() {
      return this.$store.state.bills;
    },
    billsReversed() {
      return [...this.bills]
        .sort((a, b) => {
          if (a.time.seconds === b.time.seconds) {
            return a.time.nanoseconds - b.time.nanoseconds;
          }
          return a.time.seconds - b.time.seconds;
        })
        .reverse()
        .splice(0, 5);
    },
  },
  updated() {
    if (!this.billCount) {
      this.billCount = this.bills.length;
    }
    if (this.billCount !== this.bills.length) {
      this.billCount = this.bills.length;
      console.log("yazdır", this.billCount, this.bills.length);
      window.print();
    }
  },
};
</script>

<style lang="scss" scoped>
.bills {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100vh;
  @media print {
    align-items: flex-start;
    padding: 0 1mm;
  }
  .bill {
    padding: 1mm 5mm;
    border: 1px solid black;
    width: 58mm;
    &:not(:first-child) {
      background-color: rgba(0, 0, 0, 0.1);
    }
    &-title {
      text-align: center;
      font-family: "Trebuchet MS", sans-serif;
      font-weight: bold;
      font-style: italic;
    }
    .logo {
      text-align: center;
      img {
        width: 3cm;
        height: 3cm;
      }
    }
    .date-string {
      text-align: right;
      > div {
        font-size: xx-small;
      }
    }
    .row {
      display: flex;
      justify-content: space-between;
      &.product div {
        font-size: small;
      }
      &.info {
        margin: 5mm 0;
      }
    }
    .divider {
      margin-top: 1em;
      margin-bottom: 0.5em;
      border-bottom: 2px dashed black;
    }
    @media print {
      display: none;
      &:first-child {
        display: block;
        width: 100vw;
        border: none;
        padding-bottom: 5mm;
        border-bottom: 1px solid black;
      }
    }
  }
}
</style>
