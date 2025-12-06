export default function generateTags(card, style) {
    const tags = [];
    const marks = card.marks || [];
    if (marks.some(m => m.Mark_Name === 'hit')) tags.push(<p key="hit" className={style.statusCardHit}>ХИТ</p>);
    if (marks.some(m => m.Mark_Name === 'premium')) tags.push(<p key="premium" className={style.statusCardPremium}>ПРЕМИУМ</p>);
    if (marks.some(m => m.Mark_Name === 'new')) tags.push(<p key="new" className={style.statusCardNew}>NEW</p>);
    if (marks.some(m => m.Mark_Name === 'sale' || m.Mark_Name === 'discount')) tags.push(<p key="sale" className={style.statusCardSalary}>SALE</p>);
    return tags;
}