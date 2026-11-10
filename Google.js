// 1. 要素の取得
const searchInput = document.querySelector('.search-input');
const mailList = document.querySelector('.mail-list');

// 2. 入力欄でキーが押されたときのイベントを監視
searchInput.addEventListener('keydown', function(event) {
  // Enterキーが押されたかつ、空文字ではない場合
  if (event.key === 'Enter' && searchInput.value.trim() !== '') {
    const text = searchInput.value.trim();
    
    // 現在時刻の取得（例: 14:30）
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const timeString = `${hours}:${minutes}`;

    // 3. 新しいメールアイテム（div要素）を動的に作成
    const mailItem = document.createElement('div');
    mailItem.className = 'mail-item unread'; // 未読状態のスタイルを付与
    
    mailItem.innerHTML = `
      <input type="checkbox">
      <span class="mail-sender">送信者 (自分)</span>
      <span class="mail-subject">${escapeHTML(text)}</span>
      <span class="mail-time">${timeString}</span>
    `;

    // 4. リストの一番上（先頭）に新着アイテムとして追加
    mailList.prepend(mailItem);

    // 5. 入力欄を空にする
    searchInput.value = '';
  }
});

// セキュリティ対策（XSS防止のためのHTMLエスケープ関数）
function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, function(tag) {
    const chars = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    };
    return chars[tag] || tag;
  });
}
