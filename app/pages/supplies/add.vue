<template>
    <main class="gap-2 w-full">
        <form action="./" class="flex flex-col gap-2 justify-center items-center w-full">
            <!-- Dropdown of dental supplies categories -->
            <label class="form-control w-full max-w-xs">
                <select v-model="selectedCategory" class="select ">
                    <option value="">Select a category</option>
                    <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
                </select>
            </label>
            <!-- supply name -->
            <label class="form-control w-full max-w-xs">
            <div class="label">
                <span class="label-text">Item name</span>
                <span class="label-text-alt">Top Right label</span>
            </div>
            <input type="text" placeholder="Type here" class="input input-bordered w-full max-w-xs" />
            <div class="label">
                <span class="label-text-alt">Bottom Left label</span>
                <span class="label-text-alt">Bottom Right label</span>
            </div>
            </label>
            <!-- description using textarea-->
            <label class="form-control w-full max-w-xs">
            <textarea class="textarea" placeholder="Item description"></textarea>
            <!-- quantity -->
            <label class="form-control w-full max-w-xs">
            <div class="label">
                <span class="label-text">Quantity</span>
                <span class="label-text-alt">Top Right label</span>
            </div>
            <input type="number" placeholder="Quantity" class="input input-bordered w-full max-w-xs" />
            <div class="label">
                <span class="label-text-alt">Bottom Left label</span>
                <span class="label-text-alt">Bottom Right label</span>
            </div>
            </label>
            </label>
            <!-- unit -->
            <label class="form-control w-full max-w-xs">
            <div class="label">
                <span class="label-text">Unit</span>
                <span class="label-text-alt">Top Right label</span>
            </div>
            <input type="text" placeholder="Unit of measurement" class="input input-bordered w-full max-w-xs" />
            <div class="label">
                <span class="label-text-alt">Bottom Left label</span>
                <span class="label-text-alt">Bottom Right label</span>
            </div>
            </label>
            <!-- Critical level -->
            <label class="form-control w-full max-w-xs">
            <div class="label">
                <span class="label-text">Critical Level:</span>
                <span class="label-text-alt">Top Right label</span>
            </div>
            <input type="number" placeholder="Quantity" class="input input-bordered w-full max-w-xs" />
            <div class="label">
                <span class="label-text-alt">Bottom Left label</span>
                <span class="label-text-alt">Bottom Right label</span>
            </div>
            </label>
            <!-- supplier dropdown -->
            <div class="join block">
                <select v-model="selectedSupplier" class="select join-item">
                    <option value="">Select a supplier</option>
                    <option v-for="supplier in suppliers" :key="supplier.id" :value="supplier.id">{{ supplier.name }}</option>
                </select>
                <!-- add new supplier button -->
                <button @click="addNewSupplier" class="btn join-item">
                    <Icon name="material-symbols:add" class="text-lg"></Icon>
                </button>
                <button @click="addNewSupplier" class="btn join-item">
                    <Icon name="material-symbols:edit" class="text-lg"></Icon>
                </button>
            </div>
            <!-- Form actions -->
            <div class="row-start-[0] col-span-full flex items-center justify-center">
                <div class="join block">
                    <button type="reset" class="btn btn-error join-item">
                        <Icon name="material-symbols:delete" class="text text-lg" />
                        Cancel
                    </button>
                    <button type="submit" class="btn btn-primary join-item">
                        <Icon name="material-symbols:save" class="text text-lg" />
                        Save
                    </button>
                </div>
            </div>
        </form>
    </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const selectedCategory = ref('')
const selectedSupplier = ref('')
const categories = ref([
    { id: 1, name: 'Category 1' },
    { id: 2, name: 'Category 2' },
    { id: 3, name: 'Category 3' },
    // Add more categories as needed
])

const suppliers = ref([
    { id: 1, name: 'Supplier 1' },
    { id: 2, name: 'Supplier 2' },
    { id: 3, name: 'Supplier 3' },
    // Add more suppliers as needed
])

function addNewSupplier() {
    // Add your logic to add a new supplier here
    suppliers.value.push({
        id: suppliers.value.length + 1,
        name: 'New Supplier'
    })
}
</script>
