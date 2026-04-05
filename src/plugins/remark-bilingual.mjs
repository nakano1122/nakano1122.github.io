/**
 * remark プラグイン: Markdown 本文を日英で分割
 * <!-- lang:en --> コメントを区切りに、前半を lang-ja、後半を lang-en でラップ
 * コメントがない場合は全体を lang-ja でラップ（後方互換）
 */
export default function remarkBilingual() {
	return (tree) => {
		// HTML コメント <!-- lang:en --> を探す
		let splitIndex = -1;

		for (let i = 0; i < tree.children.length; i++) {
			const node = tree.children[i];
			if (
				node.type === 'html' &&
				node.value.replace(/\s/g, '') === '<!--lang:en-->'
			) {
				splitIndex = i;
				break;
			}
		}

		if (splitIndex === -1) {
			// lang:en コメントがない場合 → 全体を lang-ja でラップ
			const jaOpen = { type: 'html', value: '<div class="lang-ja">' };
			const jaClose = { type: 'html', value: '</div>' };
			tree.children = [jaOpen, ...tree.children, jaClose];
		} else {
			// lang:en コメントがある場合 → 前半を lang-ja、後半を lang-en でラップ
			const jaPart = tree.children.slice(0, splitIndex);
			const enPart = tree.children.slice(splitIndex + 1);

			tree.children = [
				{ type: 'html', value: '<div class="lang-ja">' },
				...jaPart,
				{ type: 'html', value: '</div>' },
				{ type: 'html', value: '<div class="lang-en">' },
				...enPart,
				{ type: 'html', value: '</div>' },
			];
		}
	};
}
