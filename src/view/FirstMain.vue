<template>
  <div class="home">
    <button @click="navigateToUser">进入用户界面</button>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
  name: 'Sure',
  setup() {
    const router = useRouter();

    const navigateToUser = () => {
      router.push('/user');
    };
	
    return { navigateToUser };
  },
};
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  gap: 20px;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 5px;
}

button:hover {
  background-color: #0056b3;
}
</style>

