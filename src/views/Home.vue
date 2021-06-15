<template>
  <div class="home">
    <div
      class="desk empty"
      v-for="desk in desks"
      :key="`desk-${desk.num}`"
      :class="{ filled: isFilled(desk.num) }"
      @click="goto(desk.num)"
    >
      <span>Masa {{ desk.num }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  computed: {
    desks() {
      return [...this.$store.state.desks].sort((a, b) => {
        return a.num - b.num;
      });
    },
  },
  methods: {
    isFilled(deskNum) {
      const ordersInDesk = this.$store.state.orders.filter((order) => {
        return order.deskNum === deskNum && !order.isBilled;
      });
      return ordersInDesk.length > 0;
    },
    goto(deskNum) {
      this.$router.push(`/desk/${deskNum}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  flex-wrap: wrap;
  .desk {
    width: 42%;
    height: 20vh;
    border: 1px solid lightblue;
    border-radius: 25%;
    margin: 4%;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bolder;
    cursor: pointer;
    &.empty {
      background-color: rgba(144, 238, 144, 0.705);
      border-color: rgb(0, 197, 0);
    }
    &.filled {
      background-color: rgba(255, 255, 9, 0.671);
      border-color: rgb(255, 255, 0);
    }
  }
}
</style>
