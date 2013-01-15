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
		tagName : "div",
		className : "questionContainer",
		template : $("#questionAnswerTemplate").html(),

		render : function() {
			var tmpl = _.template(this.template);
			this.$el.html(tmpl(this.model.toJSON()));
			return this;
		}
	});

	var QuizAnswerView = Backbone.View.extend( {
		el : $("#quizAnswer"),
		controls : $("#questionAnswerControls").html(),

		initialize : function() {
			this.collection = new Quiz(quiz);
			this.index = 0;
			this.render();
		},

		render : function() {
			this.renderQuestion(this.collection.models[this.index]);
		},

		renderQuestion : function(item) {
			var questionAnswerView = new QuestionAnswerView( {
				model : item
			});
			this.$el.html(questionAnswerView.render().el);
			var tmpl = _.template(this.controls);
			var param = {
				"next" : (this.index < this.collection.models.length - 1),
				"back" : (this.index > 0)
			};
			this.$el.append(tmpl(param));
		},
		
		backQuestion: function() {
			if(this.index > 0)
				this.index = this.index - 1;
			this.render();
		},

		nextQuestion : function() {
			if(this.index < this.collection.models.length - 1)
				this.index = this.index + 1;
			this.render();
		},

		events : {
			"click .next" : "nextQuestion",
			"click .back" : "backQuestion"
		}

	});

	var quiz = [ {
		question : "What's your favourite colour?",
		choice1 : "Yellow",
		choice2 : "Orange",
		choice3 : "Red",
		choice4 : "Pink"
	}, {
		question : "How are you?",
		choice1 : "Happy",
		choice2 : "Sad",
		choice3 : "Dull",
		choice4 : "Bored"

	}, {
		question : "What's today?",
		choice1 : "Monday",
		choice2 : "Wednesday",
		choice3 : "Sunday",
		choice4 : "Friday"

	} ]

	var quizAnswerView = new QuizAnswerView();

})(jQuery);