<template>
	<li class="item">
		<div class="wrap">
			<div class="icon"></div>
			<span class="headingM"> Marketing </span>
		</div>
	</li>
</template>

<style scoped lang="scss">
	.item {
		border-radius: 0 100px 100px 0;
		background-color: $purple;
		color: $white;
		position: absolute;
		left: 0;
	}
	.wrap {
		display: flex;
		gap: 16px;
		padding: 16px 90px 16px 32px;
		align-items: center;
	}
	.icon {
		width: 16px;
		height: 16px;
		fill: white;
		background-image: url("public/img/icon-board.svg");
	}
</style>
