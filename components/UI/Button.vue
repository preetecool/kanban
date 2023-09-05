<template>
	<button
		@click="action"
		:class="classes"
	>
		{{ label }}
	</button>
</template>

<script lang="ts" setup>
	interface UIButtonProps {
		action?: (event: MouseEvent) => void;
		label: string;
		small?: boolean;
		secondary?: boolean;
		destructive?: boolean;
		login?: boolean;
	}
	const props = defineProps<UIButtonProps>();

	const classes = computed(() => {
		return {
			button: true,
			"button--small": props.small,
			"button--secondary": props.secondary,
			"button--destructive": props.destructive,
			"button--login": props.login
		};
	});
</script>

<style lang="scss" scoped>
	.button {
		width: 100%;
		// max-width: 255px;

		background-color: colors.$purple;
		color: colors.$white;
		text-align: center;
		padding: 15px 40px;
		box-sizing: border-box;
		border: none;
		border-radius: 24px;
		font-weight: bold;
		cursor: pointer;

		&:hover {
			cursor: pointer;
			background-color: colors.$purplehover;
		}
		&--login {
			max-width: 350px;
		}
		&--small {
			font-size: 13px;
			line-height: 23px;
			border-radius: 20px;
		}
		&--secondary {
			background-color: rgba(99, 95, 199, 0.1);
			color: colors.$purple;
			&:hover {
				background-color: rgba(99, 95, 199, 0.25);
			}
		}
		&--destructive {
			background-color: colors.$red;
			&:hover {
				background-color: colors.$redhover;
			}
		}
	}
</style>
