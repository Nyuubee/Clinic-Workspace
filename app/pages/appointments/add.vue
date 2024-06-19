<template>

    <FormKit type="form" id="registration-example"
    :form-class="submitted ? 'hide' : 'show'"
    submit-label="Register"
    :actions="false"
    >
      <div class="gap-y-4 gap-x-8 flex flex-col xl:flex-row" > 

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
        <!-- Appointment Date -->
      <FormKit type="date" name="appointmentDate" placeholder="YYYY-MM-DD" label="Appointment Date" />
      <FormKit type="select" label="Purpose" id="Purpose" name="Purpose" placeholder="Purpose" :options="[
        { value: '', label:'Purpose', attrs:{disabled: true}, selected: true  },
        {value:'Braces', label: 'Braces'},
        {value: 'Check-up',  label:'Check-up'},
        {value:'Teeth alignment', label: 'Teeth alignment'},
        {value:'Teeth cleaning', label: 'Teeth cleaning'}
      ]" validation="required">
      </FormKit>
      </div>

      <!-- <FormKit type="textarea" label="Notes" name="notes" placeholder="Write down notes for this patient" 
      :help="`${value.instructions ? value.instructions.length : 0} / 120`"
      validation="length:0,120"
      validation-visibility="live"
      :validation-messages="{
      length: 'Instructions cannot be more than 120 characters.',
      }">
      </FormKit> -->

      <FormKit
        type="textarea"
        name="instructions"
        label="Your Essay"
        placeholder="Remember to write in complete sentences."

        validation="length:0,120"
        validation-visibility="live"
        :validation-messages="{
          length: 'Instructions cannot be more than 120 characters.',
        }"
      />

      <NuxtLink to="./appointments" class="join-item btn btn-primary btn-sm">
          <Icon name="material-symbols:add" class="text text-lg" />
          Register
        </NuxtLink>
    </FormKit>
    
</template>

<script>
export default {

}
</script>

<style>

</style>