
var question_type ={
    single_choice:1,//单选题
    multiple_choice:2,//多选题
    indefinite_choice:3,//不定项选择题
    blank_filling:4,//填空题
    true_false:5,//判断题
    answer:6//问题题
};

var answer_sheet_status ={
    blank:1,//未作答
    right:2,//正确
    wrong:3//错误
};

module.exports = {
    "question_type": question_type,
    "answer_sheet_status": answer_sheet_status
}
