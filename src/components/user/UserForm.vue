<template>
    <v-modal 
    :isVisible="isVisible"
    :title="`${editingUser ? 'Редактирование' : 'Создание'} юзера`"
    @close="closeModal">
			<form 
			class="user-form"
			@submit.prevent="saveUser" >
				<label>
				Имя:
				<input v-model="user.firstName" />
				</label>
				<label>
				Фамилия:
				<input v-model="user.lastName" />
				</label>
				<label>
				Аватарка:
				<input type="file" accept="image/*" @change="handleAvatarChange" />
				</label>
        <div class="user-form__avatar" v-if="user.avatar" >
          <div 
          class="user-form__avatar__delete"
          @click="removeAvatar">
						<font-awesome-icon icon="fa-regular fa-xmark-circle" />
					</div>
          <img 
          :src="user.avatar" 
          alt="User Avatar" />
        </div>
				<label>
				Роль:
				<select 
				v-model="user.role" 
				@change="handleRoleChange"
				:disabled="isEditing">
						<option value="начальник">Начальник</option>
						<option value="работник">Работник</option>
				</select>
				</label>
				<label v-if="user.role === 'начальник'">
				Номер телефона:
				<input v-model="user.phoneNumber" />
				</label>
				<button type="submit">{{ editingUser ? 'Сохранить' : 'Создать' }}</button>
				<button @click="deleteUser" v-if="isEditing">Удалить</button>
			</form>
    </v-modal>
  </template>
  
  <script lang="ts">
  import VModal from '@/components/general/VModal.vue'
  import { defineComponent, ref, computed, inject, Ref } from 'vue';
  import { User, UserList, DeleteUserFunction } from '@/types/store/user'

  export default defineComponent({
    props: {
      editingUser: {
        type: Object as () => User | null,
        default: null,
      },
      isVisible: Boolean,
    },
    components: {
      VModal
    },
    emits:['close'],

    setup(props, { emit }) {
      const users = inject<Ref<UserList>>('users');
      const removeUser = inject('deleteUser') as DeleteUserFunction;
      
      const isEditing = computed(() => Boolean(props.editingUser));
      const user = ref({
        firstName: props?.editingUser?.firstName || '',
        lastName: props?.editingUser?.lastName || '',
        avatar: props?.editingUser?.avatar || '',
        role: props?.editingUser?.role || 'работник',
        phoneNumber: props?.editingUser?.phoneNumber || '',
      });
  
      const handleRoleChange = () => {
        if (user.value.role !== 'начальник') {
          user.value.phoneNumber = '';
        }
      };
  
      const handleAvatarChange = (event: Event) => {
        const target = event.target as HTMLInputElement;
        if (target.files && target.files[0]) {
          const reader = new FileReader();
          reader.onload = () => {
            user.value.avatar = reader.result as string; 
          };
          reader.readAsDataURL(target.files[0]);
        }
      };

      const removeAvatar = () => {
        user.value.avatar = ''
      }
  
      const saveUser = () => {
        if (props.editingUser !== null && users) {
          const index = users.value.findIndex(u => u.id === props.editingUser?.id);
          if (index !== -1) {
            users.value[index] = {
              ...props.editingUser,
              ...user.value,
            };
          }
        } else if (users) {
          const newUser: User = {
            id: users.value.length + 1,
            ...user.value,
          };
          users.value.push(newUser);
        }
        closeModal();
      };
  
    const deleteUser = () => {
      if (props.editingUser !== null) {
        removeUser(props.editingUser.id);
      }
      closeModal();
    };
  
      const closeModal = () => {
        emit('close')
      };
  
      return {
        user,
        isEditing,
        handleRoleChange,
        handleAvatarChange,
        removeAvatar,
        saveUser,
        deleteUser,
        closeModal,
      };
    },
  });
  </script>

<style scoped lang="scss">
.user-form{
	display: flex;
	flex-direction: column;
	gap: 10px;
  &__avatar{
    position: relative;
    width: fit-content;
    &__delete{
      position: absolute;
      border-radius: 50%;
      cursor: pointer;
      right: 0;
    }
    & img{
      width: 80px;
      height: 80px;
      border-radius: 50%;
      object-fit: cover;
    }
  }
}
</style>
  