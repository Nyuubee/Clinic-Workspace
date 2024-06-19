<template>
  <!--  :actions=false hides the  auto-added submit btn-->
  <FormKit type="group" name="patientInfo">
    <div class="gap-y-4 gap-x-8 flex flex-col xl:flex-row" > 

    <section class="first-col flex flex-col self-center gap-y-1">
      <div class="flex flex-col lg:flex-row gap-x-2">
        <!-- first name -->
        <FormKit type="text" label="First Name" name="firstName" validation="required">
        </FormKit>
        <!-- middle name -->
        <FormKit type="text" label="Middle Name" name="middleName">
        </FormKit>
        <!-- last name -->
        <FormKit type="text" label="Last Name" name="lastName" validation="required">
        </FormKit>
      </div>
      <div class="flex flex-col lg:flex-row gap-x-2 w-full">
        <!-- B-day -->
        <FormKit type="date" name="birthDate" placeholder="YYYY-MM-DD" :min="dateBefore" :max="dateBefore"
        class=""
          v-model="birthDate" label="Birthdate" :validation="`required|date_before:${dateBefore}`"
          validation-visibility="live">
        </FormKit>
        <!-- Age -->
        <FormKit type="text" name="age" label="Age" v-model="age" ignore readonly />
      </div>
      <div class="flex flex-col lg:flex-row gap-x-2">
        <!-- Religion -->
        <FormKit type="text" label="Religion" name="religion" validation="required">
        </FormKit>
        <!-- Nationality -->
        <FormKit type="text" label="Nationality" name="nationality" validation="required" value="Filipino">
        </FormKit>
      </div>

      <!-- Home address -->
      <FormKit type="textarea" label="Home Address" input-class="long-input" name="homeAddress" validation="required">
      </FormKit>
      <!-- Occupation -->
      <FormKit type="text" input-class="long-input" name="occupation" label="Occupation" validation="required">
      </FormKit>

      <!-- Dental insurance -->
      <FormKit type="text" input-class="long-input" name="insurance" label="Dental Insurance" />
      <!-- effective date -->
      <FormKit type="date" name="effectiveDate" placeholder="YYYY-MM-DD" label="Effective Date" />

      <!-- For minors -->
      <template v-if="isMinor">
        <div>
          For minors:
        </div>
        <!-- Parent/Guardian's name -->
        <FormKit type="text" label="Parent/Guardian's Name" outer-class="ml-4" input-class="long-input" name="parentGuardianName"
          validation="required">
        </FormKit>
        <!-- Occupation -->
        <FormKit type="text" label="Occupation" input-class="long-input" outer-class="ml-4" name="parentGuardianOccupation" 
          validation="required">
        </FormKit>
      </template>

      <!-- Whom may we thank for reffering you -->
      <FormKit type="text" input-class="long-input" name="referrer" label="Whom may we thank for reffering you?" />

      <!-- Reason for dental consultation -->
      <FormKit type="text" input-class="long-input" name="consultationReason"
        label="Reason for dental consultation:" />
    </section>

    <section class="second-col w-max">
      <!-- Gender -->
      <FormKit type="select" label="Sex" id="sex" name="sex" placeholder="sex" :options="[
        { value: '', label:'Sex', attrs:{disabled: true}, selected: true  },
        {value: 'male',  label:'♂ Male'},
        {value:'female', label: '♀ Female'}
      ]" validation="required">
      </FormKit>
      <!-- NickName -->
      <FormKit type="text" name="nickName" label="Nick Name:" />
      <!-- Home No. -->
      <FormKit type="text" name="homeNumber" label="Home No.:" />
      <!-- Office No. -->
      <FormKit type="text" name="officeNumber" label="Office No.:" />
      <!-- Cel/Mobile No. -->
      <FormKit type="text" name="mobileNumber" label="Cel/Mobile No.:" />
      <!-- email address -->
      <FormKit type="email" name="email" label="Email Address:" />
    </section>
    </div>
    <FormKitMessages class="col-span-2 text-error" />
    
  </FormKit>

</template>
<script setup lang="ts">
import { type FormKitNode } from "@formkit/core"
import { FormKitMessages } from '@formkit/vue'
import { calcAge } from "~/server/utils/dayjs";
defineEmits<{
  'submit': [data: any, node: FormKitNode],
}>()
function tmrw() {
  const today = new Date();
  today.setDate(today.getDate() + 1);
  return today
}


const tmr = tmrw();
const dateBefore = computed(() => tmr.toDateString())
const birthDate = ref<string>()
const age = computed({
  get() {
    if (birthDate.value) {
      return Math.max(calcAge(birthDate.value), 0);
    }
    return 0;
  },
  set(val: number) {
    return val;
  }
})
const isMinor = computed(() => age.value < 18)
</script>
<style scoped>
button[type=submit] {
  @apply self-center justify-self-center;
}

:deep(.long-input) {
  @apply lg:min-w-[30rem];
}

</style>
