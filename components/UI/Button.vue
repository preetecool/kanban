<template>
	<div>
		<button
			@click="action"
			:class="classes"
		>
			{{ label }}
		</button>
	</div>
</template>

<script lang="ts" setup>
	const props = defineProps({
		action: {
			type: Function,
			required: true
		},
		label: {
			type: String,
			required: true
		},
		//styles
		small: {
			type: Boolean,
			default: false
		},
		secondary: {
			type: Boolean,
			default: false
		},
		destructive: {
			type: Boolean,
			default: false
		}
	});
	const classes = computed(() => {
		return {
			button: true,
			"button--primaryS": props.primaryS,
			"button--secondary": props.secondary,
			"button--destructive": props.destructive
		};
	});
</script>

<style lang="scss" scoped>
	.button {
		max-width: 255px;
		width: 100%;
		background-color: $purple;
		color: $white;
		text-align: center;
		padding: 15px 60px;
		box-sizing: border-box;
		border: none;
		border-radius: 24px;
		font-weight: bold;
		&--primaryS {
			font-size: 13px;
			line-height: 23px;
			border-radius: 20px;
			&:hover {
				cursor: pointer;
				background-color: $purplehover;
			}
		}
		&--secondary {
			background-color: rgba(99, 95, 199, 0.1);
			color: $purple;
			&:hover {
				background-color: rgba(99, 95, 199, 0.25);
			}
		}
		&--destructive {
			background-color: $red;
			&:hover {
				background-color: $redhover;
			}
		}
	}
</style>
