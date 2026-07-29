import pytest
from deepeval import assert_test
from deepeval.test_case import LLMTestCase
from deepeval.metrics import AnswerRelevancyMetric

def test_answer_relevancy():
    """Verify that the generated response is semantically relevant to the user query."""
    # Define a relevancy metric with a 0.7 threshold
    answer_relevancy_metric = AnswerRelevancyMetric(threshold=0.7)
    
    # Define a test case modeling a retrieval-augmented generation (RAG) query
    test_case = LLMTestCase(
        input="What is the Open AI Engineering Standard?",
        actual_output="The Open AI Engineering Standard (OAIES) is a principal-level operational playbook for software engineering teams leveraging AI in their day-to-day SDLC work.",
        retrieval_context=[
            "The Open AI Engineering Standard (OAIES) defines standard quality gates, roles, and runnable pattern envelopes for AI integration in the software development lifecycle."
        ]
    )
    
    # Run assertions using DeepEval framework
    assert_test(test_case, [answer_relevancy_metric])
