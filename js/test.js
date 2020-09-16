$(function () {
    var IMP = window.IMP;
    IMP.init('imp27132954');
    $('.order-form').on('submit', function (e)) {
        var amount = parseFloat($('.order=form input[name="amount"]').val().replace(',',''));
        var type = $('.order=form input[name="type"]:checked').val();

        var order_id = AjaxCreateOrder(e);
        if (order_id == false) {
            alert('주문 생성 실패\n 다시 시도해주세요.')
            retrun false;
        }
        
        var merchant_id = AjaxStoreTransaction(e, order_id, amount, type);

        if (merchant_id !== ''){
            IMP.request_pay({
                merchant_uid:merchant_id,
                name:'E-shop product',
                buyer_name:$('input[name="first_name"]').val()+" "+$('input[name="last_name"]').val(), 
                buyer_email:$('input[name="email"]').val(), 
                amount: amount
            }, function (rsp) {
                if (rsp.success) { 
                    var msg = '결제가 완료되었습니다.'; 
                    msg += '고유 ID : ' + rsp.imp_uid; 
                    msg += '상점 거래 ID : ' + rsp.merchant_uid; 
                    msg += '결제 금액  : ' + rsp.paid_amount; 
                    msg += '카드 승인번호  : ' + rsp.apply_num; 
                    ImpTransaction(e, order_id, rsp.merchant_uid, rsp.imp_uid, rsp.paid_amount); 
                } else { 
                    var msg = '결제에 실패하였습니다.'; 
                    msg += '에러내용  : ' + rsp.error_msg; 
                    console.log(msg);
                }
            });
        }
        return false;
    });
})