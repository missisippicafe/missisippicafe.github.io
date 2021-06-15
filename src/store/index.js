import { createStore } from "vuex";
import Collection from "../collection";

export default createStore({
  state: {
    desks: [],
    products: [],
    orders: [],
  },
  mutations: {
    initializeApp(state) {
      const models = ["desk", "product", "order", "bill"];
      for (const model of models) {
        const collection = new Collection(model + "s");
        state[`${model}Collection`] = collection;
        state[model + "s"] = collection.useLoad();
      }
    },
  },
  actions: {
    checkout({ state }, orders) {
      const billingOrders = [];
      let total = 0;
      orders.forEach((order) => {
        const product = state.products.find((product) => {
          return product.num === order.productNum;
        });
        billingOrders.push({
          product: product.name,
          price: product.price,
          amount: order.amount,
          subtotal: product.price * order.amount,
        });
        total += product.price * order.amount;
        state.orderCollection.update(order.id, { ...order, isBilled: true });
      });
      state.billCollection.create({
        orders: billingOrders,
        total,
        deskNum: orders[0].deskNum,
        time: new Date(),
      });
    },
    createOrder({ state }, newOrder) {
      const sameProduct = state.orders.find((order) => {
        return (
          order.deskNum === newOrder.deskNum &&
          order.productNum === newOrder.productNum &&
          !order.isBilled
        );
      });
      if (sameProduct) {
        const updatedOrder = {
          ...sameProduct,
          amount: sameProduct.amount + newOrder.amount,
        };
        state.orderCollection.update(sameProduct.id, updatedOrder);
      } else {
        state.orderCollection.create(newOrder);
      }
    },
  },
  modules: {},
});
