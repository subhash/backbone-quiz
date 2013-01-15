(function($) {

	var Question = Backbone.Model.extend( {
		defaults : {
			question : "What's your favourite colour?",
			choice1 : "Yellow",
			choice2 : "Orange",
			choice3 : "Red",
			choice4 : "Pink",
		}
	});

	var Quiz = Backbone.Collection.extend( {
		model : Question
	});

	var QuestionView = Backbone.View.extend( {
		tagName : "div",
		className : "questionContainer",
		template : $("#questionTemplate").html(),
		render : function() {
			var tmpl = _.template(this.template);
			this.$el.html(tmpl(this.model.toJSON()));
			return this;
		},

		deleteQuestion : function() {
			this.model.destroy();
			this.remove();
		},
		
		optionClicked: function(e){
			this.model.set("answer", e.target.value);
		},
		
		events: {
			"click .delete" : "deleteQuestion",
			"click input:radio" : "optionClicked"
				
		}
	});

	var QuizView = Backbone.View.extend( {
		el : $("#quiz"),

		initialize : function() {
			this.collection = new Quiz(quiz);
			this.render();
			this.collection.on("add", this.renderQuestion, this);
			this.collection.on("remove", this.removeQuestion, this);
		},

		render : function() {
			that = this;
			_.each(this.collection.models, function(item) {
				that.renderQuestion(item);
			}, this);
		},

		renderQuestion : function(item) {
			var questionView = new QuestionView( {
				model : item
			});
			this.$el.append(questionView.render().el);
		},

		addQuestion : function(e) {
			e.preventDefault();
			console.log(this.collection.models[0]);
			var formData = {};
			$("#addQuestion div").children("input").each(function(i, el) {
				if ($(el).val() !== "") {
					formData[el.id] = $(el).val();
				}
			});
			quiz.push(formData);
			this.collection.add(new Question(formData));
		},
		
		removeQuestion: function(removedQuestion){
			var removedQuestionData = removedQuestion.attributes;
		    _.each(removedQuestionData, function(val, key){
		        if(removedQuestionData[key] === removedQuestion.defaults[key]){
		            delete removedQuestionData[key];
		        }
		    });
			_.each(quiz, function(question){
				if(_.isEqual(question, removedQuestionData)){
					quiz.splice(_.indexOf(quiz, question), 1);
				}
			});
		},
		
		saveQuiz: function(){
			that = this;
			var json = {};
			var index = 0;
			_.each(this.collection.models, function(item) {
				console.log(item.toJSON());
			}, this);
		},

		events : {
			"click #add" : "addQuestion",
			"click #save" : "saveQuiz"
				
		}
	});
	
	var QuizAnswerView = Backbone.View.extend( {
		el: $("quizAnswer"),
		
		initialize: function(){
			this.collection = new Quiz(quiz);
			this.render();
		},
		
		render: function(){
			renderQuestion(this.collection.models[1]);
		},
		
		renderQuestion: function(item){
			var answeringView = new AnsweringView({model: item});
			this.$el.append(answeringView.render().el);
		}
		
	});

	var quiz = [ ]

	var quizView = new QuizView();

})(jQuery);