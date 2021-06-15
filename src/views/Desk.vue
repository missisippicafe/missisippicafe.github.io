<template>
  <div class="desk">
    <div class="name-bar">Masa {{ $route.params.id }}</div>
    <div class="actions">
      <div @click="order">Sipariş</div>
      <div @click="checkout">Hesap</div>
    </div>
    <div class="orders">
      <div v-for="order in orders" :key="`order-${order.id}`" class="order">
        <div>{{ getProductName(order.productNum) }}</div>
        <div>x{{ order.amount }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Desk",
  computed: {
    orders() {
      return this.$store.state.orders.filter((order) => {
        return (
          order.deskNum === Number(this.$route.params.id) && !order.isBilled
        );
      });
    },
  },
  methods: {
    order() {
      this.$router.push(`/desk/${this.$route.params.id}/order`);
    },
    checkout() {
      this.$store.dispatch("checkout", this.orders);
    },
    getProductName(productNum) {
      const product = this.$store.state.products.find((product) => {
        return product.num === productNum;
      });

      return product.name;
    },
  },
};
</script>

<style lang="scss" scoped>
.name-bar {
  font-weight: bolder;
  text-align: center;
  padding: 2vh 0;
  background-color: rgba(0, 0, 255, 0.596);
}
.actions {
  display: flex;
  justify-content: space-around;
  margin: 2vh 0;
  div {
    padding: 1em 2em;
    background-color: lightgray;
    border: 1px solid gray;
    border-radius: 10%;
    cursor: pointer;
  }
}
.orders {
  margin: 2vh 2vh;
  display: flex;
  flex-direction: column;
  .order {
    background-color: rgba(186, 232, 253, 0.185);
    border: 1px solid lightgrey;
    padding: 0.5em;
    display: flex;
    justify-content: space-between;
  }
  .order:nth-child(odd) {
    background-color: rgba(247, 240, 212, 0.178);
  }
}
</style>
