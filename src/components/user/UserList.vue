<template>
	<div class="userList">
		<div class="userList__controls">
			<button 
				class="userList__createButton"
				@click="openUserForm(null)">
					Создать юзера
			</button>
			<label>
				Показать фамилии
				<input 
				type="checkbox" 
				:checked='isFullNameVisible' 
				@change="toggleFullNameVisibility"/>
			</label>
		</div>
    
		<div class="userList__wrapper">
			<p v-if="users.length === 0">
				Список юзеров пуст
			</p>
			<div 
			v-else
			v-for="user in users" 
			:key="user.id" 
			class="userListItem">
				<span>{{ formatedName(user) }}</span>
				<div class="userListItem__controls">
					<button 
					title="Редактировать"
					@click="editUser(user)">
						<font-awesome-icon icon="fa-regular fa-pen-to-square" />
					</button>
					<button 
					title="Удалить"
					@click="deleteUser(user.id)">
						<font-awesome-icon icon="fa-regular fa-trash-alt" />
					</button>
				</div> 
			</div>
		</div>
		<UserForm 
		v-if="isUserFormVisible"
		:editingUser="editingUser" 
		:isVisible="isUserFormVisible" 
		@close="isUserFormVisible = false" 
		/>
	</div>
  </template>
  
  <script lang="ts">
  import { computed, defineComponent, inject, ref } from 'vue';
  import UserForm from '@/components/user/UserForm.vue';
  import { User, useUserStore } from '@/stores/user';
  
  export default defineComponent({
    components: {
      UserForm,
    },
    setup() {
      const userStore = useUserStore();
      const users = inject('users') as User[]
      const isFullNameVisible = computed(() => userStore.getIsFullNameVisible) 
  
      const editingUser = ref(null as User | null);
      const isUserFormVisible = ref(false);
  
      const toggleFullNameVisibility = () => {
				userStore.toggleFullNameVisibility();
			};

			const formatedName = (user: User) => `${user.firstName} ${isFullNameVisible.value ? user.lastName : ''}`
  
      const editUser = (user: User) => {
        editingUser.value = user;
        isUserFormVisible.value = true;
      };
  
      const deleteUser = (userId: number) => {
        userStore.deleteUser(userId);
      };
  
      const openUserForm = (user: User | null) => {
        editingUser.value = user;
        isUserFormVisible.value = true;
      };
  
      return {
        users,
        isFullNameVisible,
        editingUser,
        isUserFormVisible,
        toggleFullNameVisibility,
        editUser,
        deleteUser,
        openUserForm,
				formatedName,
      };
    },
  });
  </script>

	<style lang="scss" scoped>
	.userList{
		width: 50%;
		&__wrapper{
			display: flex;
			flex-direction: column;
			gap: 10px;
		}
		&__controls{
			margin-bottom: 20px;
		}
		&__createButton{
			width: fit-content;
			margin-right: 20px;
		}
		
	}
	.userListItem{
		border: 1px solid green;
		padding: 10px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		&__controls{
			display: flex;
			gap: 5px;
		}
	}
	</style>
  