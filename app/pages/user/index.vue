<template>
  <NuxtLayout name="default">
    <template #navbar-start>
      <!-- Edit -->
      <button class="btn primary" @click="viewing = !viewing">
        <Icon name="material-symbols:edit" v-if="viewing"></Icon>
        <Icon name="material-symbols:visibility" v-else></Icon>
        {{ viewing ? 'Edit' : 'View' }}
      </button>
    </template>
    <template #navbar-end>
      <button class="btn secondary" onclick="logout_modal.showModal()">
        <Icon name="material-symbols:logout"></Icon>
        Log out
      </button>
    </template>
    <!-- Open the modal using ID.showModal() method -->
    <dialog id="logout_modal" class="modal">
      <div class="modal-box">
        <h3 class="font-bold text-lg">Are you sure you want to log out?</h3>
        <p class="py-4">Press ESC key or click the button below to close</p>
        <div class="modal-action items-center">
          <form method="dialog" class="join flex justify-center gap-x-6 w-full">
            <!-- if there is a button in form, it will close the modal -->
            <button class="btn btn-error" @click="signOut()">
              <Icon name="material-symbols:logout"></Icon>
              Log out
            </button>
            <button class="btn btn-success">Cancel</button>
          </form>
        </div>
      </div>
    </dialog>
    <!-- Open the modal using ID.showModal() method -->
    <dialog id="informationUpdated" ref="informationUpdatedDialog" class="modal" >
      <div class="modal-box bg-success text-success-content">
        <h3 class="font-bold text-lg">Information Updated!</h3>
        <p class="py-4">Press ESC key or click the button below to close</p>
        <div class="modal-action">
          <form method="dialog">
            <!-- if there is a button in form, it will close the modal -->
            <button class="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
    <main>
      <FormKit v-if="user" name="user" :id="FORM_ID" type="form" class="justify-center"
        formClass="grid grid-cols-3 justify-center" :value="user" :actions="!viewing" :disabled="viewing"
        @submit="onSubmit">
        <div class="card">
          <div class="card-body">
            <div class="card-title">
              Profile picture:
            </div>
            <div class="avatar">
              <div class="w-32 rounded-full">
                <img :src="data?.user?.image!" alt="">
              </div>
            </div>
          </div>
        </div>

        <!-- add role card -->
        <div class="card">
          <div class="card-body">
            <div class="card-title">
              Roles:
            </div>
            <div v-for="{ role } of user.roles" class="badge badge-outline">
              {{ role }}
            </div>
          </div>
        </div>
        <div>
          <!-- for spacing -->
        </div>
        <FormKit validation="" name="firstName" id="firstName" label="First Name" type="text" />
        <FormKit validation="" name="middleName" id="middleName" label="Middle Name" type="text" />
        <FormKit validation="" name="lastName" id="lastName" label="Last Name" type="text" />
        <FormKit validation="" name="email" id="email" type="email" label="Email" />
        <FormKit name="phone" id="phone" label="Contact #" type="tel" placeholder="xxxxxxxxxxx"
          validation="matches:/^[0-9]{11}$/" :validation-messages="{
            matches: 'Phone number must be in the format xxxxxxxxxxx'
          }" />
        <FormKit validation="" name="address" id="address" label="Address" type="textarea" />
        <FormKit validation="" name="birthDate" id="birthDate" label="Birthdate" type="date" />
        <FormKit validation="" name="sex" id="sex" label="Sex" type="select" :options="['male', 'female']"></FormKit>
      </FormKit>
      <br>
      <div class="">
        <h2 class="text-primary text-lg">
          Google Account:
        </h2>
        <span class="ml-4" v-if="data?.user?.oauth == 'google'">
          <Icon name="material-symbols:check" class="btn btn-sm btn-success btn-circle"></Icon>
          Linked
        </span>
        <AuthProviders :callbackUrl v-else />
      </div>
    </main>
  </NuxtLayout>
</template>
<script setup lang="ts">
import { FormKit, FormKitSchema, useFormKitNodeById, type FormKitGroupValue, type FormKitSchemaNode, type SubmitHandler } from "~/utils/formkit"
const { signOut, data } = useAuth();
// Override layout to add the dental chart progression
definePageMeta({
  layout: false
})
const viewing = ref(true)
const callbackUrl = computed(() => {
  return `/user?bind=true&id=${data.value?.user?.id}`;
});
const FORM_ID = "user"
const route = useRoute("user")
const { data: user } = useFetch(`/api/users/${data.value?.user?.id}`)
const { data: linkStatus } = useFetch(`/api/oauth/bind/${route.query.id}`)
watch(linkStatus, (status) => {
  if (status?.google) {
    navigateTo({
      query: {
        linkSuccess: "true",
      }
    })
  }
})

const informationUpdatedDialog = ref<HTMLDialogElement>()
const form = useFormKitNodeById(FORM_ID)
const onSubmit: SubmitHandler<Required<typeof user.value> & FormKitGroupValue> = async (value, node) => {
  console.log(value)
  const { oauth, roles, createdAt, updatedAt, ...body } = value
  // return
  const response = await $fetch(`/api/users/${data.value?.user?.id}`, {
    method: "PATCH",
    body,
  })
  viewing.value = true
  form.value?.reset(body)
  informationUpdatedDialog.value?.showModal()
}

</script>
