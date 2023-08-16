<template>
	<div class="user-list">
		<div class="user-list__controls">
			<button 
				class="user-list__controls__create-button"
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
    
		<div class="user-list__wrapper">
			<p v-if="users.length === 0">
				Список юзеров пуст
			</p>
			<div 
			v-else
			v-for="user in users" 
			:key="user.id" 
			class="user-list__item">
				<span>{{ formatedName(user) }}</span>
				<div class="user-list__item__controls">
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
		<user-form 
		v-if="isUserFormVisible"
		:editingUser="editingUser" 
		:isVisible="isUserFormVisible" 
		@close="isUserFormVisible = false" 
		/>
	</div>
  </template>
  
  <script lang="ts">
  import { defineComponent, inject, Ref, ref } from 'vue';
  import UserForm from '@/components/user/UserForm.vue';
  import { User, UserList, ToggleFullNameVisibility, DeleteUserFunction } from '@/types/store/user'
  
  export default defineComponent({
    components: {
      UserForm,
    },
    setup() {
      const users = inject('users') as UserList
      const isFullNameVisible = inject('isFullNameVisible') as Ref<boolean>
			const toggleFullName = inject('toggleFullNameVisibility') as ToggleFullNameVisibility
			const removeUser = inject('deleteUser') as DeleteUserFunction
  
      const editingUser = ref(null as User | null);
      const isUserFormVisible = ref(false);
  
      const toggleFullNameVisibility = () => {
				toggleFullName();
			};

			const formatedName = (user: User) => `${user.firstName} ${isFullNameVisible.value ? user.lastName : ''}`
  
      const editUser = (user: User) => {
        editingUser.value = user;
        isUserFormVisible.value = true;
      };
  
      const deleteUser = (userId: number) => {
        removeUser(userId);
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
	.user-list{
		width: 50%;
		&__wrapper{
			display: flex;
			flex-direction: column;
			gap: 10px;
		}
		&__controls{
			margin-bottom: 20px;
			&__create-button{
				width: fit-content;
				margin-right: 20px;
			}
		}
		&__item{
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
	}
	</style>
  