//main.js：游戏主逻辑文件
var board = new Array();
var hasConflicted = new Array();
var score = 0;
$(function(){
	//newgame()方法用于开始新的游戏
	newgame();
});
//newgame()需要完成两个步骤
//第一：初始化棋盘格
//第二：随机两个格子生成两个数字

function newgame(){
	//初始化棋盘格
	init();
	//在随机两个格子生成随机数字
	generateOneNumber();
	generateOneNumber();
}
function restartgame() {
    $("#gameover").remove();
    updateScore(0);
    newgame();
}

//init()方法
function init(){
	//i表示4X4的格子中的行
	for(var i = 0; i<4; i++){
		//j表示4x4的格子中的列
		for(var j = 0; j<4; j++){
			//通过双重遍历获取每个格子元素
			var gridCell = $("#grid-cell-" + i + "-" + j);
			//通过getPosTop()方法设置每个格子距顶端的距离
			gridCell.css("top", getPosTop(i, j));
			//通过getPosLeft()方法设置每个格子距左端的距离
			gridCell.css("left", getPosLeft(i, j));
			
		}
	}
	for (var i = 0; i < 4; i++) {
	    board[i] = [];
	    hasConflicted[i] = [];
	    for (var j = 0; j < 4; j++) {
	        	//将每个格子的值初始化为0
	    	board[i][j] = 0;
	        hasConflicted[i][j] = false;
	    }
   	}
	updateBoardView();
	score = 0;
}

//初始化数字格
function updateBoardView(){
	//首先清空之前的数字格布局内容
	$(".number-cell").remove();
	for(var i = 0; i < 4; i++){
		for(var j = 0; j < 4; j++){
			//向棋盘格上增加数字格
			$("#grid-container").append("<div class='number-cell' id='number-cell-" + i + "-" + j + "'></div>")
			var numberCell = $("#number-cell-"+i+"-"+j);
			//如果棋盘格的值为0的话,设置数字格为高宽都为0
			if(board[i][j] == 0){
				numberCell.css("width", "0px");
                numberCell.css("height", "0px");
                numberCell.css("top", getPosTop(i, j) + 35);
                numberCell.css("left", getPosLeft(i, j) + 35);
			}
			//如果棋盘格的值不为0的话,设置数字格为高宽为70并设置背景色和前景色及数字值
			else{
				numberCell.css("width", "70px");
                numberCell.css("height", "70px");
                numberCell.css("top", getPosTop(i, j));
                numberCell.css("left", getPosLeft(i, j));
                numberCell.css("background-color", getNumberBackgroundColor(board[i][j]));
                numberCell.css("color", getNumberColor(board[i][j]));
                numberCell.text(board[i][j]);
			}
			hasConflicted[i][j] = false;
		}
	}
}

//生成随机数字
function generateOneNumber() {
	//这段代码的好处就是，如果棋盘格中没有了空格，直接返回了false，而不用执行下面的代码
	//如果没有这段代码，那么会一直进行死循环，浪费带宽
    if (nospace(board)) {
        return false;
    }
    //1、生成随机一个位置
    var randx = parseInt(Math.floor(Math.random() * 4));
    var randy = parseInt(Math.floor(Math.random() * 4));
    //定义一个死循环，完成生成随机空格子
    while (true) {
    	//如果当前格子的值为0，满足条件
        if (board[randx][randy] == 0) {
            break;
        }
//      否则重新随机一个位置
        var randx = parseInt(Math.floor(Math.random() * 4));
        var randy = parseInt(Math.floor(Math.random() * 4));
    }

    //2、生成随机一个数字
    //注意：生成的数字只能是2或者4
    var randNumber = Math.random() < 0.5 ? 2 : 4;
    //3、在随机位置显示随机数字
    board[randx][randy] = randNumber;
    ShowNumberWithAnimation(randx, randy, randNumber);
    return true;
}

