// 匿名函数闭包

(function($){
	$(function(){

		//页面结构功能
		if ($('html').hasClass('one-page-layout')) {

			var pagesCount = $('.wrapper>section').length;
			// console.log(pagesCount);
			$.initTripleLayout();

		}

		// 关于我 关键字动画
		var rotate_words = $('.rotate-words');
		if (rotate_words.length) {
			rotate_words.each(function(index,element){
				$(element).find('span').eq(0).addClass('active');
				// 按3秒周期执行
				setInterval(function(){
					nex_word_index = $(element).find('.active').next().length ?  $(element).find('.active').next().index() : 0; //返回下一个同辈元素的序列
					$(element).find('.active').addClass('rotate-out').removeClass('rotate-in active');
					$(element).find('span').eq(nex_word_index).addClass('rotate-in active').removeClass('rotate-out');
				},3000);
			});
		}

		//设置好作品排列
		setMasonry();

		// ------------------------------
		// 技能进度条
		fillBars();
		// ------------------------------
	});

	//设置isotope
	function setMasonry(){

		var masonry = $('.portfolio-items');
		if (masonry.length) {
			masonry.each(function(index, el) {
				$(el).imagesLoaded(function(){
					$(el).isotope({
						layoutMode : $(el).data('layout')?$(el).data('layout'):'masonry'	
					});
					//设置列数
					refreshMasonry();
				});

				if (!$(el).data('isotope')) {
					//设置过滤器
					var filters = $(el).siblings('.filters');
					if (filters.length) {
						filters.find('a').on('click', function() {

							var selector = $(this).attr('data-filter');
							$(el).isotope({filter:selector});
							$(this).parent().addClass('current').siblings().removeClass('current');
							return false;
						});
					}
				}
			});//each
		}
	}
	$(window).on('resize',function(){
		refreshMasonry();
	});
	// 刷新portfolio图片流
	function refreshMasonry(){
		 var masonry = $('.portfolio-items');
		 if (masonry.length) {
		 	masonry.each(function(index,el){
		 		//检查isotope是否初始化
		 		if ($(el).data('isotope')) {
		 			// console.log('isotope 已经初始化');
		 			var itemW = 360;
		 			var containerW = $(el).width();
		 			var items = $(el).children('.hentry');
		 			var columns = Math.round(containerW/itemW);
		 			// console.log(containerW);
		 			// console.log(columns);
		 			// 给每个item设置widths（%）
		 			items.each(function(index,element){
		 				//设置放大倍数
		 				var multiplier = $(this).hasClass('x2') && columns >1 ? 2:1;
		 				var itemRealWidth = (Math.floor(containerW/columns)*100/containerW)*multiplier;
		 				$(this).css('width',itemRealWidth+'%');
		 			});
		 			var columnWidth = Math.floor(containerW/columns);
		 			$(el).isotope('option',{masonry:{ columnWidth:columnWidth}});
		 			$(el).isotope('layout');
		 		}
		 	});//each
		 }
	}

	// 进度条设置
	function fillBars(){
		$('.bar').each(function(){
			var bar = $(this);
			bar.find('.progress').css('width',bar.attr('data-percent')+'%');
		});
	}

	//更改页面
	function setActivePage(){
		$('.page').removeClass('active').hide();
	}
})(jQuery);