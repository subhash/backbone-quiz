(function($) {
	
	var Question = Backbone.Model.extend( {
		defaults : {
			coverImage : "img/placeholder.png",
			question : "What's your favourite colour?",
			choice1 : "Yellow",
			choice2 : "Orange",
			choice3 : "Red",
			choice4 : "Pink"
		}
	});

	var Quiz = Backbone.Collection.extend( {
		model : Question
	});
	
	var QuestionAnswerView = Backbone.View.extend( {
		tagName: "div",
		template: $("#questionAnswerTemplate").html(),
		render: function(){
			var tmpl = _.template(this.template);
			this.$el.html(tmpl(this.model.toJSON()));
			return this;
		}
	});

	var QuizAnswerView = Backbone.View.extend( {
		el: $("#quizAnswer"),
		
		initialize: function(){
			this.collection = new Quiz(quiz);
			this.render();
		},
		
		render: function(){
			that = this;
			_.each(this.collection.models, function(item) {
				that.renderQuestion(item);
			}, this);
		},
		
		renderQuestion: function(item){
			var questionAnswerView = new QuestionAnswerView({model: item});
			console.log(questionAnswerView.render().el);
			this.$el.append(questionAnswerView.render().el);
		}
		
	});

	var quiz = [
	            {question : "What's your favourite colour?",
				choice1 : "Yellow",
				choice2 : "Orange",
				choice3 : "Red",
				choice4 : "Pink"} 
	            ]

	var quizAnswerView = new QuizAnswerView();

})(jQuery);