<template>
  <div class="form">
    <div class="row">
      <label for="product">Ürün</label>
      <select id="product" ref="product" v-model="productId">
        <option
          v-for="product in products"
          :key="`product-${product.num}`"
          :value="product.num"
        >
          {{ product.name }}
        </option>
      </select>
    </div>
    <div class="row">
      <label for="amount">Adet</label>
      <input type="number" id="amount" v-model="amount" />
    </div>
    <div class="row">
      <div @click="add" class="button">Ekle</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Order",
  data: () => ({
    amount: 1,
    productId: 1,
  }),
  computed: {
    products() {
      return this.$store.state.products;
    },
  },
  methods: {
    add() {
      const data = {
        deskNum: Number(this.$route.params.id),
        productNum: Number(this.productId),
        amount: Number(this.amount),
      };
      this.$store.dispatch("createOrder", data);
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
.row {
  display: flex;
  flex-direction: column;
  padding: 1em;
}
select,
input {
  padding: 0.5em;
}
.button {
  text-align: center;
  padding: 0.5em;
  border: 1px solid black;
  border-radius: 10px;
  background-color: lightgreen;
  cursor: pointer;
}
</style>
