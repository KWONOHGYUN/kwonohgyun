$(document).ready(function() {
    $.ajax({
        method: 'get',
        url: '/my-info',
        
    }).done(function (data) {
        console.log(data);
        if(data.success) {
            if(data.user.utype > 0) {
                var utype = '일반회원';
            } else {
                var utype = '관리자';
            }
            $('#current-email').html(`<span>${data.user.email}</span>`);
            $('#current-id').html(`<span>${data.user.uid}</span>`);
            $('#rank').html(`<span>회원등급 : ${utype}</span>`);
            $('#myinfo').html(`<span>${data.user.uid}</span>`);
            $('#current-password').html(`<span>${data.user.pwd}</span>`);
        } else {
            $('#msg-alert').text(data.msg);
        }
    });

    
});



//이메일 변경
$('#btn-email-change').click(function (){
    
   
   
});

//아이디 변경
$('#btn-account-change').click(function (){
   
   
});

//비밀번호 변경
$('#btn-password-change').click(function (){

    var prevPwd = $('#input-user-pwd').val();
    var newPwd = $('#input-user-newpwd').val();

    var pwdFailCode = inspectPassword(prevPwd, prevPwd);
    if(pwdFailCode !== null) {
        $('#input-user-pwd').val('');
        $('#input-user-newpwd').val('');
        return alert(failMsg[pwdFailCode]);
    }

    var pwdFailCode2 = inspectPassword(newPwd, newPwd);
    if(pwdFailCode2 !== null) {
        $('#input-user-pwd').val('');
        $('#input-user-newpwd').val('');
        return alert(failMsg[pwdFailCode]);
    }

    
    $.ajax({
        method: 'put',
        url : '/change-pwd',
        data : {
            prevPwd : prevPwd,
            newPwd : newPwd
        }
    }).done(function(data){
        // console.log(data);
        if(data.success) {
            alert('비밀번호 변경 성공');
        } else {
            alert(data.msg);
        }
       
    })
   
   
});

$('#btn-join-out').click(function(){
    var pwd = $('#input-user-password').val();
    $.ajax({
        method: 'delete',
        url : '/account',
        data: {
            pwd : pwd
        }
    }).done(function (data) {
        console.log(data);
        if(data.success) {
            alert('회원탈퇴 성공');
            location.href = '/'
        } else {
            alert(data.msg);
        }
    });   
})